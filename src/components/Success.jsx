import { useLottie } from "lottie-react";
import success from '../assets/success.json';

const style = {
    height: 300,
};

const Success = () => {
    const options = {
        animationData: success,
        loop: false,
        autoplay: true,
        renderer: 'svg',
    };
    
    const { View } = useLottie(options, style);
    
    return View;
};

export default Success;