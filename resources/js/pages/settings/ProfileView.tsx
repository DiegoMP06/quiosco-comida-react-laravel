import MainLayout from "@/layouts/MainLayout";
import EditProfileForm from "./Profile/EditProfileForm";
import EditPasswordForm from "./Profile/EditPasswordForm";

export default function ProfileView() {
    return (
        <MainLayout
            title="Perfil"
            subtitle="Aquí puedes administrar tu perfil."
        >
            <EditProfileForm />

            <EditPasswordForm />
        </MainLayout>
    )
}

