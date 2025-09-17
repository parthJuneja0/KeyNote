import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

const Alert = (props) => {
    const { message, type = 'info', onClose, autoClose = true, duration = 5000 } = props;
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (autoClose && message) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, message]);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
                onClose();
            }
        }, 300);
    };

    const getAlertStyles = () => {
        const baseStyles = "flex items-center justify-between p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 transform";

        switch (type) {
            case 'success':
                return `${baseStyles} bg-green-500/20 border-green-500/30 text-green-300`;
            case 'error':
                return `${baseStyles} bg-red-500/20 border-red-500/30 text-red-300`;
            case 'warning':
                return `${baseStyles} bg-yellow-500/20 border-yellow-500/30 text-yellow-300`;
            case 'info':
            default:
                return `${baseStyles} bg-blue-500/20 border-blue-500/30 text-blue-300`;
        }
    };

    const getIcon = () => {
        const iconProps = { className: "w-5 h-5 flex-shrink-0" };

        switch (type) {
            case 'success':
                return <CheckCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-green-400" />;
            case 'error':
                return <XCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-red-400" />;
            case 'warning':
                return <AlertCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-yellow-400" />;
            case 'info':
            default:
                return <Info {...iconProps} className="w-5 h-5 flex-shrink-0 text-blue-400" />;
        }
    };

    if (!message || !isVisible) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full mx-4">
            <div
                className={`${getAlertStyles()} ${isAnimating ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
                    }`}
            >
                <div className="flex items-start space-x-3 flex-1">
                    {getIcon()}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleClose}
                    className="ml-4 p-1 rounded-md hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
                    aria-label="Close alert"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default Alert