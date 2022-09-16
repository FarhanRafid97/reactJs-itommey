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
} from '@chakra-ui/react';
import { useState } from 'react';
import { updateProductAction } from '../store/actions/productAction';
import { useAppDispatch } from '../store/hooks/hook';
import { ProductType } from '../store/reducers/product';

interface UpdateProductModalProps {
  data: ProductType;
}

export type UpdateInputType = Pick<
  ProductType,
  'id' | 'name' | 'picture' | 'qty' | 'expiredAt'
>;
const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ data }) => {
  const disptach = useAppDispatch();
  const [product, setProduct] = useState<UpdateInputType>({
    id: data.id,
    name: data.name,
    picture: data.picture,
    qty: data.qty,
    expiredAt: data.expiredAt,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    disptach(updateProductAction(product));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="telegram" onClick={onOpen}>
        Edit
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

export default UpdateProductModal;
