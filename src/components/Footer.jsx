const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 mt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-lg font-bold mb-3">Clothes Store</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium streetwear for the modern generation.<br />
                            Quality comfortable Clothes delivered to your doorstep.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-md font-semibold mb-3">Links</h5>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition no-underline text-sm">Home</a></li>
                            <li><a href="/products" className="text-gray-400 hover:text-white transition no-underline text-sm">Products</a></li>
                            <li><a href="/cart" className="text-gray-400 hover:text-white transition no-underline text-sm">Cart</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-md font-semibold mb-3">Contact</h5>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>Casablanca, Morocco</li>
                            <li>+212 704 752 318</li>
                            <li>support@hoodiestore.ma</li>
                        </ul>
                    </div>
                </div>
                <hr className="border-gray-700 my-6" />
                <div className="text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Hoodies Store. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
