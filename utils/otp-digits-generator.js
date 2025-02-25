export const generateOTPDigits = ({
    digits = 4,
    min = 0,
    max = ( ( 10**digits ) - 1 ),
    excludeThis = []
}) => {
    let num = ( Math.random() * ( max - min ) ) + min
    num = Math.floor( num )
    let stringifiedNum = num.toString()
    stringifiedNum = '0'.repeat( digits - stringifiedNum.length ) + stringifiedNum
    if ( excludeThis.includes( stringifiedNum ) ){
        generateOTPDigits( { digits, min, max, excludeThis } )
    } else {
        return stringifiedNum
    }
}