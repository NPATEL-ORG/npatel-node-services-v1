const otpStore = []

export const OTP_storageInserter = ({ email, otp }) => {
    if ( otpStore.map(i => i.email).includes(email) ){
        let otpCount = otpStore.filter(i => i.email == email)[0].count
        if(otpCount < 5){
            otpStore.pop({ email })
            otpStore.push({ email, otp, count: otpCount + 1 })
        }
    } else {
        otpStore.push({ email, otp, count: 1 })
    }
    console.log('OTP Store insertion --->', otpStore)
}

export const OTP_storageRemover = (email) => {
    otpStore.pop({ email })
    console.log('OTP Store Deletion --->', otpStore)
}

export const OTP_viewer = (email) => {
    console.log('OTP Store requested--->', otpStore)
    return otpStore.filter(i => i.email == email)[0]
}
