import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { addProductAction } from '../store/actions/productAction';
import { useAppDispatch } from '../store/hooks/hook';
import { InputProductType } from '../store/types/product';

interface AddProductModalProps {}

const AddProductModal: React.FC<AddProductModalProps> = () => {
  const toast = useToast();
  const disptach = useAppDispatch();
  const [product, setProduct] = useState<InputProductType>({
    expiredAt: '',
    name: '',
    picture: '',
    qty: 0,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    disptach(addProductAction(product));
    setProduct({ expiredAt: '', name: '', picture: '', qty: 0 });
    toast({
      title: 'Product Added!!',
      status: 'success',
      position: 'top',
      duration: 4000,
      isClosable: true,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="whatsapp">
        Add Data
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Flex direction="column" rowGap="15px">
                <Input
                  placeholder="Basic usage"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="file"
                  value={product.picture}
                  onChange={(e) => {
                    e.preventDefault();
                    const reader = new FileReader();
                    if (!e.target.files) {
                      return setProduct({ ...product, picture: '' });
                    }
                    const file = e.target.files[0];

                    if (reader !== undefined && file !== undefined) {
                      reader.readAsDataURL(file);
                      reader.onloadend = (e) => {
                        setProduct({
                          ...product,
                          picture: reader.result as string,
                        });
                      };
                    }
                  }}
                />

                <Input
                  placeholder="Basic usage"
                  type="number"
                  value={product.qty}
                  onChange={(e) =>
                    setProduct({ ...product, qty: Number(e.target.value) })
                  }
                />
                <Input
                  placeholder="Basic usage"
                  type="date"
                  value={product.expiredAt}
                  onChange={(e) =>
                    setProduct({ ...product, expiredAt: e.target.value })
                  }
                />
              </Flex>
              <Button mt={4} w="full" colorScheme="telegram" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProductModal;
