import { FaRegFlag } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Spinner } from '../utils/Button';

const Donations = () => {
  const [paypal, setPaypal] = useState(<Spinner />)

  const PaypalComp = () => {
    return (
      <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
        >
          <input type="hidden" name="hosted_button_id" value="ATPT3DVZYJ8L4" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
        </form>
    )
  }

  useEffect(() => {
    if (isMobile) return
    setTimeout(() => {
      setPaypal(PaypalComp)
    }, 500)
  },[])

  return (
    <div className="mb-5 h-[220px] box-content w-[310px] rounded-md border border-reddit_border bg-reddit_dark-brighter">
      <div className="flex p-4">
        <div className="self-center">
          <FaRegFlag className="h-6 w-6" />
        </div>
        <div className="ml-4 text-sm">
          <div className="self-center font-bold">
            <p>Bbaby</p>
          </div>
          <div className="self-center">
            <p className="flex break-words">
              If you want to help us develop a social platform where everyone
              can share without censorship,
            </p>
            <p>Consider making a small PayPal donation</p>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-2 mb-3 justify-center flex">
        {paypal}
      </div>
    </div>
  )
}

export default Donations;
