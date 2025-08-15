import { Link } from "react-router";

const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/">
				<p className="text-2xl font-bold text-gradient">RESUMERADAR</p>
			</Link>
			<Link
				to="/upload"
				className="primary-button w-fit text-center ml-3">
				Upload Resume
			</Link>
		</nav>
	);
};

export default Navbar;
