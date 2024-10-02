import {IPricing} from "@/@types/plugin";

export const sortPriceList = (price_list?:IPricing[])=> {
const prices = price_list?.filter((eachItem:IPricing) =>
    eachItem?.price !== null
    && (typeof eachItem?.features?.[0] === 'string' || typeof eachItem?.features?.[0]?.feature_name === 'string'))
    ?.sort((a, b) => a?.price - b?.price);
return prices
}
