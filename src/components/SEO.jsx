import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image }) => {
    const siteName = "UzAuto Trailer";
    const fullTitle = `${title} | ${siteName}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Social Media (Facebook, Telegram) */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || "/logo.png"} />
            <meta property="og:type" content="website" />

            {/* Google botlariga ruxsat */}
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
};

export default SEO;