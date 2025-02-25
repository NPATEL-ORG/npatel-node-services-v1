const otpStore = [
    {
        mail:'',
        otp:'0000',
        count:0,
    }
]

export const OTP_storageInserter = ({ mail, otp }) => {
    if ( otpStore.map(i => i.mail).includes(mail) ){
        let otpCount = otpStore.filter(i => i.mail == mail)[0].count
        if(otpCount < 5){
            otpStore.pop({ mail })
            otpStore.push({ mail, otp, count: otpCount + 1 })
        }
    } else {
        otpStore.push({ mail, otp, count: 1 })
    }
    console.log('--->', otpStore)
}

export const OTP_storageRemover = (mail) => {
    otpStore.pop({ mail })
}

export const OTP_viewer = (mail) => {
    return otpStore.filter(i => i.mail == mail)[0]
}
