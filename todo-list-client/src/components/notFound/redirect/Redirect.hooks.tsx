import { useTranslation } from "react-i18next";
import { isTokenExpired } from "../../../router/Router.service";
import { useNavigate } from "react-router-dom";

export const useRedirect = () => {
    const { t, i18n: { language }} = useTranslation();
    const navigate = useNavigate();
    const isExpired = isTokenExpired();

    let redirect;
    let redirectText;

    if (isExpired) {
        redirect = () => navigate(`/${language}/auth`);
        redirectText = t("return_auth");
    } else {
        redirect = () => navigate(`/${language}/home`);
        redirectText = t("return_home");
    }

    return { redirect, redirectText };
}

