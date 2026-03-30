const Loader = () => {
	return (
		<div className='flex items-center justify-center min-h-[200px] py-8'>
			<div className='relative'>
				<div className='animate-spin rounded-full h-12 w-12 border-4 border-light-border dark:border-dark-border border-t-primary'></div>
				<div className='absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-pulse'></div>
			</div>
		</div>
	);
};

export default Loader;
