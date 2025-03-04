import ContactForm from "./contact-form";

export const ContactSection = () => {
	return (
		<>
			<div className="min-h-screen dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
							Contact Us
						</h1>
						<p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Have questions or need assistance? We're here to
							help. Fill out the form below and we'll get back to
							you as soon as possible.
						</p>
					</div>
					<ContactForm />
				</div>
			</div>
		</>
	);
};
