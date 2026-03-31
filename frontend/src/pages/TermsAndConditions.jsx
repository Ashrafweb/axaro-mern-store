import Footer from "../components/Footer";

const TermsAndConditions = () => {
	return (
		<div className='min-h-screen bg-light-bg dark:bg-dark-bg'>
			<div className='container mx-auto max-w-7xl px-4 py-12'>
				{/* Hero */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4'>
						Terms &amp; Conditions
					</h1>
					<p className='text-light-text-secondary dark:text-dark-text-secondary'>
						Last updated: January 1, 2025
					</p>
				</div>

				<div className='bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8 space-y-8 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed'>
					{/* Acceptance */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							1. Acceptance of Terms
						</h2>
						<p>
							By accessing and using the Axaro website and services, you accept
							and agree to be bound by the terms and provisions of this
							agreement. If you do not agree to abide by these terms, please do
							not use our services.
						</p>
					</section>

					{/* Use of Site */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							2. Use of the Website
						</h2>
						<p className='mb-3'>
							You agree to use our website only for lawful purposes and in a way
							that does not infringe the rights of others or restrict their use
							of the site. Prohibited uses include, but are not limited to:
						</p>
						<ul className='list-disc list-inside space-y-2 ml-4'>
							<li>
								Transmitting any unsolicited or unauthorised advertising material.
							</li>
							<li>
								Attempting to gain unauthorized access to any part of the site.
							</li>
							<li>
								Engaging in any conduct that disrupts or interferes with the site.
							</li>
							<li>
								Uploading or transmitting any malicious code or harmful content.
							</li>
						</ul>
					</section>

					{/* Account Registration */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							3. Account Registration
						</h2>
						<p>
							To access certain features of Axaro, you may be required to create
							an account. You are responsible for maintaining the confidentiality
							of your account credentials and for all activities that occur under
							your account. You agree to notify us immediately of any unauthorized
							use of your account.
						</p>
					</section>

					{/* Products & Pricing */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							4. Products and Pricing
						</h2>
						<p className='mb-3'>
							We reserve the right to modify, suspend, or discontinue any
							product at any time without notice. All prices are listed in USD
							and are subject to change without notice. We strive to display
							accurate product descriptions and images, but we do not warrant
							that product descriptions or other content are accurate, complete,
							or error-free.
						</p>
						<p>
							In the event a product is listed at an incorrect price, we reserve
							the right to refuse or cancel any orders placed for that product.
						</p>
					</section>

					{/* Orders & Payments */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							5. Orders and Payments
						</h2>
						<p>
							By placing an order, you represent that the information you
							provide is accurate and complete. We reserve the right to refuse
							any order. Payment must be received prior to the dispatch of goods.
							We accept major credit/debit cards and other payment methods as
							displayed at checkout.
						</p>
					</section>

					{/* Shipping & Returns */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							6. Shipping and Returns
						</h2>
						<p className='mb-3'>
							Delivery times are estimates only and are not guaranteed. Axaro is
							not responsible for delays caused by carriers or customs. Returns
							are accepted within 30 days of delivery, provided the item is
							unused and in its original packaging. Digital products are
							non-refundable.
						</p>
					</section>

					{/* Intellectual Property */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							7. Intellectual Property
						</h2>
						<p>
							All content on this website — including text, graphics, logos,
							images, and software — is the property of Axaro or its content
							suppliers and is protected by applicable intellectual property
							laws. You may not reproduce, distribute, or create derivative works
							without our express written permission.
						</p>
					</section>

					{/* Limitation of Liability */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							8. Limitation of Liability
						</h2>
						<p>
							To the fullest extent permitted by law, Axaro shall not be liable
							for any indirect, incidental, special, or consequential damages
							arising from your use of our website or services, even if we have
							been advised of the possibility of such damages. Our total
							liability to you shall not exceed the amount paid for the
							transaction giving rise to the claim.
						</p>
					</section>

					{/* Privacy */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							9. Privacy Policy
						</h2>
						<p>
							Your use of Axaro is also governed by our Privacy Policy, which is
							incorporated into these Terms by reference. Please review our
							Privacy Policy to understand our practices regarding the collection
							and use of your personal information.
						</p>
					</section>

					{/* Changes */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							10. Changes to Terms
						</h2>
						<p>
							We reserve the right to update or modify these Terms at any time
							without prior notice. Your continued use of the website following
							any changes constitutes your acceptance of the revised Terms. We
							encourage you to review this page periodically.
						</p>
					</section>

					{/* Contact */}
					<section>
						<h2 className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3'>
							11. Contact Us
						</h2>
						<p>
							If you have any questions about these Terms &amp; Conditions,
							please contact us at{" "}
							<a
								href='mailto:support@axaro.com'
								className='text-primary-light hover:underline'
							>
								support@axaro.com
							</a>
							.
						</p>
					</section>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default TermsAndConditions;
