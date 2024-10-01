export const sortPriceList = (price_list)=> {
const prices = price_list?.filter((eachItem) =>
    eachItem?.price !== null
    && (typeof eachItem?.features?.[0] === 'string' || typeof eachItem?.features?.[0]?.feature_name === 'string'))
    ?.sort((a, b) => a?.price - b?.price);
return prices
}
