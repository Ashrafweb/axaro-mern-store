import Footer from "../components/Footer";

const AboutUs = () => {
	return (
		<div className='min-h-screen bg-light-bg dark:bg-dark-bg'>
			<div className='container mx-auto max-w-7xl px-4 py-12'>
				{/* Hero */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4'>
						About Us
					</h1>
					<p className='text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto'>
						We are Axaro — a modern e-commerce store dedicated to bringing you
						the best products at unbeatable prices.
					</p>
				</div>

				{/* Our Story */}
				<section className='mb-12 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8'>
					<h2 className='text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4'>
						Our Story
					</h2>
					<p className='text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4'>
						Founded in 2023, Axaro started with a simple idea: make online
						shopping easy, affordable, and enjoyable for everyone. From our
						humble beginnings as a small startup, we have grown into a trusted
						marketplace serving thousands of happy customers worldwide.
					</p>
					<p className='text-light-text-secondary dark:text-dark-text-secondary leading-relaxed'>
						We believe that great products should be accessible to all. Our team
						works tirelessly to curate a diverse catalog spanning electronics,
						fashion, home goods, and much more — all under one roof.
					</p>
				</section>

				{/* Mission & Values */}
				<section className='mb-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 text-center'>
						<div className='text-4xl mb-4'>🎯</div>
						<h3 className='text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2'>
							Our Mission
						</h3>
						<p className='text-light-text-secondary dark:text-dark-text-secondary'>
							To deliver an unparalleled shopping experience by offering quality
							products, transparent pricing, and outstanding customer service.
						</p>
					</div>
					<div className='bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 text-center'>
						<div className='text-4xl mb-4'>💡</div>
						<h3 className='text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2'>
							Our Vision
						</h3>
						<p className='text-light-text-secondary dark:text-dark-text-secondary'>
							To become the most loved and trusted global e-commerce platform,
							where every customer feels valued and every purchase brings joy.
						</p>
					</div>
					<div className='bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 text-center'>
						<div className='text-4xl mb-4'>🤝</div>
						<h3 className='text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2'>
							Our Values
						</h3>
						<p className='text-light-text-secondary dark:text-dark-text-secondary'>
							Integrity, innovation, and inclusivity guide everything we do. We
							treat each customer like family and every product with care.
						</p>
					</div>
				</section>

				{/* Team */}
				<section className='mb-12 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8'>
					<h2 className='text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6'>
						Meet the Team
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
						{[
							{ name: "Alex Johnson", role: "CEO & Founder" },
							{ name: "Maria Garcia", role: "Head of Product" },
							{ name: "James Lee", role: "Lead Engineer" },
							{ name: "Sara Ahmed", role: "Customer Success" },
						].map((member) => (
							<div key={member.name} className='text-center'>
								<div className='w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3'>
									{member.name.charAt(0)}
								</div>
								<h4 className='font-semibold text-light-text-primary dark:text-dark-text-primary'>
									{member.name}
								</h4>
								<p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
									{member.role}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Stats */}
				<section className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
					{[
						{ value: "10K+", label: "Happy Customers" },
						{ value: "5K+", label: "Products" },
						{ value: "50+", label: "Brands" },
						{ value: "99%", label: "Satisfaction Rate" },
					].map((stat) => (
						<div
							key={stat.label}
							className='bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 text-center'
						>
							<p className='text-3xl font-bold text-primary-light mb-1'>
								{stat.value}
							</p>
							<p className='text-light-text-secondary dark:text-dark-text-secondary text-sm'>
								{stat.label}
							</p>
						</div>
					))}
				</section>
			</div>
			<Footer />
		</div>
	);
};

export default AboutUs;
