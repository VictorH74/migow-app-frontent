import { redirect } from "next/navigation";

export default function HomePage() {

  // authenticate or login page

  // if logged
  redirect("/in/posts")
}