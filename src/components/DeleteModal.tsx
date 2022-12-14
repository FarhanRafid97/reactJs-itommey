import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteProductAction } from '../store/actions/productAction';
import { useAppDispatch } from '../store/hooks/hook';

interface DeleteModalProps {
  id: number;
  index: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        colorScheme="red"
        className={`delete_button_index_${index}`}
        onClick={onOpen}
      >
        <DeleteIcon />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody color="red.500">
              Are you sure To Delete This Product?.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="delete_product_button"
                colorScheme="red"
                onClick={() => {
                  dispatch(deleteProductAction(id));
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteModal;
