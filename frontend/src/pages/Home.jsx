import { Link } from "react-router-dom";
import { FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";

const Home = () => {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-[rgb(var(--laurier-blue))] to-[rgb(var(--laurier-purple))] text-[rgb(var(--laurier-white))] py-20 px-4 md:py-32">
				<div className="max-w-5xl mx-auto text-center">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						Connect. Collaborate. Create.
					</h1>
					<p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
						Find the perfect team for your next big idea or join exciting
						projects that match your skills.
					</p>
					<div className="flex justify-center">
						<Link
							to="/projects"
							className="px-8 py-3 bg-[rgb(var(--laurier-white))] text-[rgb(var(--laurier-blue))] font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg">
							Explore Projects
						</Link>
					</div>
				</div>
			</section>
			<section className="py-16 px-4 bg-[rgb(var(--laurier-white))]">
				<h2 className="text-3xl font-bold text-center mb-12">
					Why Choose Laurier Connect?
				</h2>
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-[rgb(var(--laurier-white))] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<div className="text-[rgb(var(--laurier-blue))] text-4xl mb-4 flex justify-center">
							<FaLightbulb />
						</div>
						<h3 className="text-xl font-bold mb-4 text-center">
							Showcase Your Projects
						</h3>
						<p className="text-[rgb(var(--laurier-black))] text-center">
							Present your work through engaging video reels and media
							portfolios to attract interest from potential collaborators.
						</p>
					</div>

					<div className="bg-[rgb(var(--laurier-white))] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<div className="text-[rgb(var(--laurier-blue))] text-4xl mb-4 flex justify-center">
							<FaUsers />
						</div>
						<h3 className="text-xl font-bold mb-4 text-center">
							Find Perfect Collaborators
						</h3>
						<p className="text-[rgb(var(--laurier-black))] text-center">
							Connect with like-minded individuals and build your dream team for
							any project.
						</p>
					</div>

					<div className="bg-[rgb(var(--laurier-white))] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<div className="text-[rgb(var(--laurier-blue))] text-4xl mb-4 flex justify-center">
							<FaRocket />
						</div>
						<h3 className="text-xl font-bold mb-4 text-center">
							Streamlined Team Building
						</h3>
						<p className="text-[rgb(var(--laurier-black))] text-center">
							Easily manage applications and build your dream team with our
							intuitive project management tools.
						</p>
					</div>
				</div>
				<div className="text-center mt-12">
					<Link
						to="/projects"
						className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] font-semibold text-lg">
						View All Projects →
					</Link>
				</div>
			</section>
			<section className="bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] py-16 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to bring your ideas to life?
					</h2>
					<p className="text-xl mb-8">
						Join our community of innovators, creators, and collaborators today.
					</p>
					<Link
						to="/register"
						className="inline-block px-8 py-3 bg-[rgb(var(--laurier-white))] text-[rgb(var(--laurier-blue))] font-semibold rounded-lg hover:bg-[rgb(var(--laurier-yellow))] transition-all shadow-lg">
						Get Started
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Home;
