const HTTP_METHODS = new Set(["get", "post", "put", "patch", "delete"]);

const actionWords = new Set([
  "create",
  "delete",
  "fetch",
  "get",
  "list",
  "remove",
  "search",
  "sort",
  "test",
  "update",
]);

const allowedNonResourceRoutes = new Set([
  "signup",
  "login",
  "logout",
  "me",
  "health",
]);

const legacyQueryNames = new Map([
  ["searchQuery", "search"],
  ["sortBy", "sort"],
  ["sortOrder", "sort"],
  ["pageNumber", "page"],
  ["pageSize", "limit"],
]);

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getLiteralRoute = (node) => {
  if (node.type !== "Literal" || typeof node.value !== "string") {
    return null;
  }

  return node.value;
};

const isPathParameter = (segment) => segment.startsWith(":");

const isValidSegment = (segment) => {
  return /^(:[a-z][a-zA-Z0-9]*|[a-z0-9]+(?:-[a-z0-9]+)*)$/.test(segment);
};

const containsActionWord = (segment) => {
  if (isPathParameter(segment)) {
    return false;
  }

  const words = segment.toLowerCase().split("-");

  return words.some((word) => actionWords.has(word));
};

const isPascalCase = (name) => /^[A-Z][A-Za-z0-9]*$/.test(name);
const isCamelCase = (name) => /^[a-z][A-Za-z0-9]*$/.test(name);
const isConstantCase = (name) => /^[A-Z][A-Z0-9_]*$/.test(name);

const getIdentifierName = (node) => {
  return node?.type === "Identifier" ? node.name : null;
};

/* -------------------------------------------------------------------------- */
/* Rule 1: Route Resource Naming                                              */
/* -------------------------------------------------------------------------- */

const routeResourceNaming = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce predictable, noun-based REST resource URLs.",
    },
    schema: [],
    messages: {
      actionWord:
        "Use a noun-based resource URL; move the action into the HTTP method instead of '{{segment}}'.",

      trailingSlash: "Do not add a trailing slash to resource URLs.",

      invalidSegment:
        "Use lowercase kebab-case for URL segments and ':param' for path parameters.",

      invalidRoute: "Route paths must start with '/'.",

      queryInPath:
        "Do not put query parameters in the route path. Use req.query instead.",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type !== "MemberExpression" ||
          node.callee.object.type !== "Identifier" ||
          node.callee.object.name !== "router" ||
          node.callee.property.type !== "Identifier" ||
          !HTTP_METHODS.has(node.callee.property.name)
        ) {
          return;
        }

        const route = getLiteralRoute(node.arguments[0]);

        if (route === null) {
          return;
        }

        if (!route.startsWith("/")) {
          context.report({
            node: node.arguments[0],
            messageId: "invalidRoute",
          });

          return;
        }

        if (route.length > 1 && route.endsWith("/")) {
          context.report({
            node: node.arguments[0],
            messageId: "trailingSlash",
          });
        }

        if (route.includes("?")) {
          context.report({
            node: node.arguments[0],
            messageId: "queryInPath",
          });
        }

        const segments = route.split("/").filter(Boolean);

        for (const segment of segments) {
          const normalizedSegment = segment.toLowerCase();

          if (
            !isPathParameter(segment) &&
            !allowedNonResourceRoutes.has(normalizedSegment) &&
            containsActionWord(segment)
          ) {
            context.report({
              node: node.arguments[0],
              messageId: "actionWord",
              data: {
                segment,
              },
            });
          }

          if (!isValidSegment(segment)) {
            context.report({
              node: node.arguments[0],
              messageId: "invalidSegment",
            });
          }
        }
      },
    };
  },
};

/* -------------------------------------------------------------------------- */
/* Rule 2: Query Parameter Names                                              */
/* -------------------------------------------------------------------------- */

const restQueryParameterNames = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce consistent REST query parameter names for searching, sorting, and pagination.",
    },
    schema: [],
    messages: {
      legacyName:
        "Use '{{replacement}}' instead of '{{name}}' for REST query parameters.",
    },
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object.type !== "MemberExpression" ||
          node.object.object.type !== "Identifier" ||
          node.object.object.name !== "req" ||
          node.object.property.type !== "Identifier" ||
          node.object.property.name !== "query" ||
          node.computed ||
          node.property.type !== "Identifier"
        ) {
          return;
        }

        const parameterName = node.property.name;
        const replacement = legacyQueryNames.get(parameterName);

        if (!replacement) {
          return;
        }

        context.report({
          node: node.property,
          messageId: "legacyName",
          data: {
            name: parameterName,
            replacement,
          },
        });
      },

      Property(node) {
        if (node.key.type !== "Identifier" || !node.value || node.computed) {
          return;
        }

        const parameterName = node.key.name;
        const replacement = legacyQueryNames.get(parameterName);

        if (!replacement) {
          return;
        }

        context.report({
          node: node.key,
          messageId: "legacyName",
          data: {
            name: parameterName,
            replacement,
          },
        });
      },
    };
  },
};

/* -------------------------------------------------------------------------- */
/* Rule 3: Consistent Error Responses                                         */
/* -------------------------------------------------------------------------- */

const consistentErrorResponse = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce centralized and consistent REST API error handling.",
    },
    schema: [],
    messages: {
      directSend:
        "Do not send error responses directly from controllers. Throw an application error and let errorMiddleware format the response.",

      directJson:
        "Do not return error JSON directly from controllers. Use createAppError() and centralized errorMiddleware.",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type !== "MemberExpression" ||
          node.callee.object.type !== "Identifier" ||
          node.callee.object.name !== "res" ||
          node.callee.property.type !== "Identifier"
        ) {
          return;
        }

        const method = node.callee.property.name;

        if (method === "send") {
          context.report({
            node,
            messageId: "directSend",
          });

          return;
        }

        if (method !== "json") {
          return;
        }

        const parent = node.parent;

        if (
          parent?.type === "CallExpression" &&
          parent.callee.type === "MemberExpression" &&
          parent.callee.object.type === "Identifier" &&
          parent.callee.object.name === "res" &&
          parent.callee.property.type === "Identifier" &&
          parent.callee.property.name === "status"
        ) {
          const statusArgument = parent.arguments[0];

          if (
            statusArgument?.type === "Literal" &&
            typeof statusArgument.value === "number" &&
            statusArgument.value >= 400
          ) {
            context.report({
              node,
              messageId: "directJson",
            });
          }
        }
      },
    };
  },
};

/* -------------------------------------------------------------------------- */
/* Rule 4: Identifier Naming                                                  */
/* -------------------------------------------------------------------------- */

const identifierNaming = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce PascalCase types, camelCase functions and variables, and uppercase constants.",
    },
    schema: [],
    messages: {
      typeName: "Type and interface names must use PascalCase: '{{name}}'.",
      functionName: "Function names must use camelCase: '{{name}}'.",
      variableName:
        "Variable and parameter names must use camelCase: '{{name}}'.",
      constantName:
        "Constants with immutable values should use UPPER_SNAKE_CASE: '{{name}}'.",
    },
  },

  create(context) {
    const checkVariableName = (node) => {
      const name = getIdentifierName(node.id);

      if (!name || name.startsWith("_")) return;

      const isFunctionValue =
        node.init?.type === "ArrowFunctionExpression" ||
        node.init?.type === "FunctionExpression";
      const isConstructorFactory =
        node.init?.type === "CallExpression" && /^[A-Z]/.test(name);

      if (isFunctionValue && !isCamelCase(name)) {
        context.report({
          node: node.id,
          messageId: "functionName",
          data: { name },
        });
        return;
      }

      if (
        !isFunctionValue &&
        !isConstructorFactory &&
        !isCamelCase(name) &&
        !isConstantCase(name)
      ) {
        context.report({
          node: node.id,
          messageId: "variableName",
          data: { name },
        });
      }
    };

    return {
      TSInterfaceDeclaration(node) {
        const name = getIdentifierName(node.id);

        if (name && !isPascalCase(name)) {
          context.report({
            node: node.id,
            messageId: "typeName",
            data: { name },
          });
        }
      },

      TSTypeAliasDeclaration(node) {
        const name = getIdentifierName(node.id);

        if (name && !isPascalCase(name)) {
          context.report({
            node: node.id,
            messageId: "typeName",
            data: { name },
          });
        }
      },

      FunctionDeclaration(node) {
        const name = getIdentifierName(node.id);

        if (name && !isCamelCase(name)) {
          context.report({
            node: node.id,
            messageId: "functionName",
            data: { name },
          });
        }
      },

      VariableDeclarator: checkVariableName,

      Parameter(node) {
        const name = getIdentifierName(node);

        if (name && !name.startsWith("_") && !isCamelCase(name)) {
          context.report({
            node,
            messageId: "variableName",
            data: { name },
          });
        }
      },
    };
  },
};

/* -------------------------------------------------------------------------- */
/* Rule 5: File Naming                                                        */
/* -------------------------------------------------------------------------- */

const fileNaming = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce kebab-case names for backend source files.",
    },
    schema: [],
    messages: {
      fileName:
        "Backend source filenames must use lowercase kebab-case: '{{name}}'.",
    },
  },

  create(context) {
    const fileName = context.filename;
    const baseName = fileName.split(/[\\/]/).pop() || "";
    const nameWithoutTypes = baseName.replace(/\.d?\.(?:ts|tsx|js|jsx)$/, "");

    if (
      nameWithoutTypes &&
      nameWithoutTypes !== "index" &&
      !/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(
        nameWithoutTypes,
      )
    ) {
      context.report({
        node: context.sourceCode.ast,
        messageId: "fileName",
        data: { name: baseName },
      });
    }

    return {};
  },
};

/* -------------------------------------------------------------------------- */
/* Export Rules                                                               */
/* -------------------------------------------------------------------------- */

export const restApiRules = {
  "route-resource-naming": routeResourceNaming,
  "query-parameter-names": restQueryParameterNames,
  "consistent-error-response": consistentErrorResponse,
  "identifier-naming": identifierNaming,
  "file-naming": fileNaming,
};
