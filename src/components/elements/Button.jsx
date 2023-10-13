import Link from 'next/link';
import React from 'react';

const Button = ({ text, path }) => {

    return (
        <Link href={path}>
            <div className='btn btn-neutral'>
                {text}
            </div>
        </Link>
    );
};

export default Button;