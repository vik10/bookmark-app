import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createBookmarkSchema,
  type createBookmarkType,
} from "../../../../shared";
import { CommonDrawer } from "../../components";
import {
  useCreateBookmarkMutation,
  useGetBookmarksQuery,
} from "../../api/bookmark-api";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "created_at" | "url" | "id">(
    "created_at",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createBookmarkType>({
    resolver: zodResolver(createBookmarkSchema),
  });

  const [createBookmark] = useCreateBookmarkMutation();
  const { data, isLoading, isError } = useGetBookmarksQuery({
    search: searchQuery,
    sort: `${sortBy}:${sortOrder}`,
  });

  const bookmarks = data?.data ?? [];

  const onSubmit = async (data: createBookmarkType) => {
    try {
      await createBookmark(data).unwrap();
      reset();
      setOpen(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
          spacing={2}
        >
          <Typography variant="h4">Dashboard</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create New Bookmark
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { xs: "stretch", sm: "center" } }}
        >
          <TextField
            label="Search bookmarks"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              label="Sort by"
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as "title" | "created_at" | "url" | "id",
                )
              }
            >
              <MenuItem value="created_at">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="url">URL</MenuItem>
              <MenuItem value="id">ID</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="sort-order-label">Order</InputLabel>
            <Select
              labelId="sort-order-label"
              label="Order"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value as "asc" | "desc")
              }
            >
              <MenuItem value="desc">Descending</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {isLoading && <Typography>Loading bookmarks...</Typography>}
        {isError && (
          <Typography color="error">Unable to load bookmarks.</Typography>
        )}
        <p>Total: {bookmarks.length}</p>

        {!isLoading && bookmarks.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No bookmarks found.
          </Typography>
        )}

        <Stack spacing={2}>
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} variant="outlined">
              <CardHeader
                title={bookmark.title}
                subheader={bookmark.created_at || "Recently added"}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Link
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    underline="hover"
                  >
                    {bookmark.url}
                  </Link>

                  <Typography variant="body2" color="text.secondary">
                    {bookmark.description || "No description added."}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>

      <CommonDrawer
        title="Create New Bookmark"
        open={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="URL"
              fullWidth
              {...register("url")}
              error={!!errors.url}
              helperText={errors.url?.message}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={4}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end" }}
            >
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Bookmark"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </CommonDrawer>
    </>
  );
};

export default Dashboard;
