import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-4 w-full">
			<div className="text-center text-sm px-4 max-w-screen overflow-x-hidden">
				<span className="text-base font-bold">RESUMERADAR</span> — Made
				with ❤️ by{" "}
				<Link
					to="https://github.com/kshitijhadke26"
					target="_blank"
					rel="noopener noreferrer"
					className="font-medium underline">
					Kshitij Hadke
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
