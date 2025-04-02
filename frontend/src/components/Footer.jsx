import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-[rgb(var(--laurier-white))] text-[rgb(var(--laurier-black))] py-10 mt-auto">
			<div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
				<div className="w-full text-center mb-8">
					{/* Logo content if any */}
				</div>

				<div className="flex flex-wrap justify-center gap-12 mb-10">
					<div className="w-full sm:w-auto text-center">
						<h3 className="font-semibold text-lg mb-3">Navigation</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/projects"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									Projects
								</Link>
							</li>
							<li>
								<Link
									to="/collaborators"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									Collaborators
								</Link>
							</li>
							<li>
								<Link
									to="/login"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									Login
								</Link>
							</li>
						</ul>
						<div className="flex justify-center space-x-4 text-xl mt-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
								<FaFacebook />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
								<FaTwitter />
							</a>
						</div>
					</div>

					<div className="w-full sm:w-auto text-center">
						<h3 className="font-semibold text-lg mb-3">Resources</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/about"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link
									to="/faq"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									FAQ
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									Contact
								</Link>
							</li>
							<li>
								<Link
									to="/terms"
									className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
									Terms of Service
								</Link>
							</li>
						</ul>
						<div className="flex justify-center space-x-4 text-xl mt-4">
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[rgb(var(--laurier-purple))] transition-colors">
								<FaInstagram />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[rgb(var(--laurier-blue))] transition-colors">
								<FaLinkedin />
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-[rgb(var(--laurier-black))] mt-6 pt-6 text-center">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} Laurier Connect. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
