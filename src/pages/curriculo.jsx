import Navbar from "../components/navbar";
import { useLanguage } from "../context/LanguageContext";

export default function Curriculo() {
    const { t } = useLanguage();

    return (
        <>
            <Navbar />
            <div className="pt-32 px-6 md:px-20 text-white">
                <h1 className="text-4xl font-bold mb-8">{t.navbar.curriculum}</h1>
                {/* Content will go here */}
            </div>
        </>
    );
}
