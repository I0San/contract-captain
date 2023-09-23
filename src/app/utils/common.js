import { ethers } from 'ethers'
import { toast } from 'react-hot-toast'

export const shortenAddress = (address, length=4, start=0) => {
    let res = ''
    if (address) {
        const first = address?.substring(start, start + length)
        const last = address?.substring(address?.length - length, address?.length)
        res = first + '...' + last
    }
    return res
}

export const remove0x = (str) => {
    if (str.slice(0, 2) === "0x") {
        return str.slice(2);
    }
    return str;
}

export const getFormatedValue = (val, type) => {
    switch (type) {
        case 'address':
            return shortenAddress(val, 8)
        default:
            return val
    }
}

export const isAddress = (input) => {
    return (input && ethers.utils.isAddress(input)) ? true : false
}

export const isABI = (input) => {
    if (!input) return false
    try {
        JSON.parse(input)
        return true

    } catch (error) {
        toast.error("Sorry, couldn't parse ABI.")
        console.log(error)
        return false
    }
}

export const isCode = () => {
    // TODO - try parse solidity code
    return true
}

export function classNames(...classes) { return classes.filter(Boolean).join(' ')}