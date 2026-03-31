import { Link } from "react-router-dom";

const Footer = () => {
return (
<div className='bg-dark-bg p-2 mt-4 border-t-[1px] border-dark-border'>
<section className='container mx-auto max-w-7xl grid grid-cols-1 gap-2 text-dark-text-primary font-primary p-2 sm:p-4 md:px-8'>
<div className='flex flex-col-reverse gap-4 sm:grid sm:grid-cols-3'>
<div className='flex justify-around sm:col-span-2 border-r-[1px] border-dark-border justify-center items-center gap-4 sm:gap-2 md:gap-12'>
<div className='text-start'>
<h1 className='font-bold text-md md:text-lg'>Company</h1>
<ul className='list-none grid grid-cols-1 gap-3'>
<li>
<Link
to='/about'
className='hover:text-primary-light transition-colors'
>
About Us
</Link>
</li>
<li>Careers</li>
<li>Our Stores</li>
</ul>
</div>
<div className='text-start'>
<h1 className='font-bold text-md md:text-lg'>Help</h1>
<ul className='list-none grid grid-cols-1 gap-3'>
<li>
<a
href='/#faq'
className='hover:text-primary-light transition-colors'
>
FAQ
</a>
</li>
<li>Payment Options</li>
<li>
<Link
to='/terms'
className='hover:text-primary-light transition-colors'
>
Terms &amp; Conditions
</Link>
</li>
</ul>
</div>
</div>
<div className='col-span-1 px-2'>
<div className='newlestter'>
<div className='flex flex-col lg:flex-row gap-2'>
<input
name='email'
className='p-2 border-0 bg-light-surface'
placeholder='Your Email'
type='email'
/>
<button
className='bg-primary-light px-4 font-semibold py-2'
>
Subscribe
</button>
</div>
</div>
</div>
</div>
<div className='text-center py-2 mt-4'>
<h2 className='text-sm sm:text-md md:text-lg'>
Copyright @2025 Axaro. All rights reserved
</h2>
</div>
</section>
</div>
);
};

export default Footer;
