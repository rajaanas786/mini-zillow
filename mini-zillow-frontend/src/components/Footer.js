import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-8 border-t">
      <p className="text-sm text-gray-600 ml-1">
        &copy; {new Date().getFullYear()} Mini Zillow. Raja Anas
        <Link
          to="https://rajaanas786.github.io/portfolio/"
          target="_blank"
          className="text-blue-700 hover:text-blue-600 ml-1"
        >
          https://rajaanas786.github.io/portfolio/
        </Link>
      </p>
    </footer>
  );
}
