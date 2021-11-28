import React from 'react'

export const NavOptions = ({children, dec, ...props}) => {
    return (
        <li className={dec} {...props}>
            {children}
        </li>
    )
}

//         {/* {headerUser.role} */}
//         <li className="bg-transparent text-gray-500 border-2 border-purple-200 hover:bg-purple-50 text-lg font-bold tracking-widest px-4 py-2 rounded-lg hover:shadow focus:outline-none">
//           <Link href="/p/write">
//             <a>Write</a>
//           </Link>
//         </li>

{/* <NavOptions
onClick={() => {
  console.log("clicked!");
}}
dec="bg-transparent text-gray-500 border-2 border-purple-200 hover:bg-purple-50 text-lg font-bold tracking-widest px-4 py-2 rounded-lg hover:shadow focus:outline-none"
>
<Link href="/p/write">
  <a>Write</a>
</Link> */}
// </NavOptions>

{/* <input
aria-label="Search for an article"
type="text"
placeholder="Search"
className="p-2 w-1/3 focus:w-2/5 rounded-lg text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-pink-100"
/> */}