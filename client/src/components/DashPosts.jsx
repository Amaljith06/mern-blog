import { Table, TableCell, TableHead } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  // fetching posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <TableHead>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </TableHead>
            {userPosts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {/* Date */}
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  {/* Image */}
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      ></img>
                    </Link>
                  </TableCell>
                  {/* Title */}
                  <TableCell>
                    <Link className='font--medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                  </TableCell>
                  {/* Category */}
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>{post.category}</Link>
                  </TableCell>
                  {/* Delete */}
                  <TableCell>
                    <span className="font-medium text-red-500">Delete</span>
                  </TableCell>
                  {/* Edit */}
                  <TableCell>
                    <Link className='text-teal-500' to={`/update-post/${post._id}`}>
                    <span>Edit</span>
                    </Link>
                  </TableCell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}
