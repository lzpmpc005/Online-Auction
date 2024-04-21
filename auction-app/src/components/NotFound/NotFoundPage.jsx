import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center text-center gap-4 my-4">
      <h1>Page Not Found</h1>
      <Link to="/">
        <Button variant="light">Go Home</Button>
      </Link>
    </div>
  );
}
