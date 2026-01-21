import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";

const DeleteUserModal = ({ open, onClose, onConfirm }) => {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent
                size="sm"
                className="
          bg-background/95
          backdrop-blur-xl
          border border-border/50
          shadow-2xl
        "
            >
                <AlertDialogHeader>
                    {/* ICON BADGE */}
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive dark:bg-destructive/20">
                        <Trash2Icon className="h-5 w-5" />
                    </div>

                    <AlertDialogTitle className="text-center">
                        Delete user?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center">
                        This action cannot be undone. This will permanently delete the user
                        from the database and remove all associated data.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel variant="outline" onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                    className="bg-red-600 hover:bg-destructive/90 text-white"
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteUserModal;
