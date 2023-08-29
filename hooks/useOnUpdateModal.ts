import { Student } from "@/types/types";
import useEditModal from "./useEditModal";
import useAuthModal from "./useAuthModel";
import { useUser } from "./useUser";

const useOnUpdateModal = (students: Student[]) => {
    const UpdateStudentModal = useEditModal();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onUpdateModal = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        UpdateStudentModal.setId(id);
        UpdateStudentModal.setIds(students.map((student) => student.id))
    }

    return onUpdateModal;
}

export default useOnUpdateModal;