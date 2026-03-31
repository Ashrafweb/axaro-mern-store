import { useState } from "react";

const faqs = [
	{
		question: "How do I place an order?",
		answer:
			"Browse our store, add items to your cart, and proceed to checkout. You can pay securely with a credit/debit card or other supported payment methods. Once your order is confirmed, you will receive an email with the order details.",
	},
	{
		question: "What is your return policy?",
		answer:
			"We accept returns within 30 days of delivery. Items must be unused and in their original packaging. To initiate a return, contact our support team at support@axaro.com. Digital products are non-refundable.",
	},
	{
		question: "How long does shipping take?",
		answer:
			"Standard shipping typically takes 5–7 business days. Expedited shipping options (2–3 business days) are available at checkout for an additional fee. Delivery times may vary depending on your location.",
	},
	{
		question: "Can I track my order?",
		answer:
			"Yes! Once your order is dispatched, you will receive a tracking number via email. You can use this number on the carrier's website to monitor your delivery in real time.",
	},
	{
		question: "Are my payment details secure?",
		answer:
			"Absolutely. All transactions are encrypted using industry-standard SSL technology. We never store your full card details on our servers. Payments are processed through trusted and PCI-compliant payment gateways.",
	},
	{
		question: "How do I contact customer support?",
		answer:
			"You can reach our support team 24/7 via email at support@axaro.com or through the live chat widget on the bottom-right corner of the page. We aim to respond to all enquiries within 24 hours.",
	},
];

const FaqAccordion = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section
			id='faq'
			className='py-16 px-4 bg-light-bg dark:bg-dark-bg'
		>
			<div className='container mx-auto max-w-7xl'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4'>
						Frequently Asked Questions
					</h2>
					<p className='text-light-text-secondary dark:text-dark-text-secondary max-w-xl mx-auto'>
						Have questions? We have answers. If you can&apos;t find what
						you&apos;re looking for, feel free to contact us.
					</p>
				</div>

				<div className='max-w-3xl mx-auto space-y-3'>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className='bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl overflow-hidden'
						>
							<button
								className='w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none'
								onClick={() => toggle(index)}
								aria-expanded={openIndex === index}
							>
								<span className='font-medium text-light-text-primary dark:text-dark-text-primary pr-4'>
									{faq.question}
								</span>
								<span
									className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary-light text-white transition-transform duration-200 ${
										openIndex === index ? "rotate-45" : ""
									}`}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-4 h-4'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2.5}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M12 4v16m8-8H4'
										/>
									</svg>
								</span>
							</button>

							{openIndex === index && (
								<div className='px-6 pb-5 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed'>
									{faq.answer}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FaqAccordion;
