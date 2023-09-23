// import React from 'react'
// import PropTypes from 'prop-types'
// import ValidationError from './validationError'
// import ValidationExlamation from './validationExlamation'

// const Input = props => {
//     return (
//         <>
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Contract address
//             </label>
//             <div className="relative mt-1 rounded-md shadow-sm">
//                 <input
//                     type="text"
//                     name="address"
//                     id="address"
//                     className={classNames(
//                         !errors.address
//                             ? 'border-gray-300'
//                             : 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500',
//                         'block w-full rounded-md shadow-sm pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
//                     )}
//                     placeholder="0x..."
//                     {...register("address", { required: true, validate: isAddress })}
//                 />
//                 {errors.address && <ValidationExlamation />}
//             </div>
//             {errors.address && errors.address.type === "required" && <ValidationError msg="Contract address is a required field" />}
//             {errors.address && errors.address.type === "validate" && <ValidationError msg="Please enter a valid contract address" />}
//         </>
//     )
// }

// Input.propTypes = {

// }

// export default Input