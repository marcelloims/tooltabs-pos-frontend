import React from "react";
import Script from "next/script";

const MyScript = () => {
    return (
        <>
            <Script src="https://code.jquery.com/jquery-3.7.1.slim.js" />
            <Script src="/static/assets/vendor/global/global.min.js" />
            <Script src="/static/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js" />
            <Script src="/static/assets/js/custom.min.js" />
            <Script src="/static/assets/js/deznav-init.js" />
        </>
    );
};

export default MyScript;
