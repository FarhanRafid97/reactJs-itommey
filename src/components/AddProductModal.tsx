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
  Image,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { AddIcon } from '@chakra-ui/icons';
import { addProductAction } from '../store/actions/productAction';
import { useAppDispatch } from '../store/hooks/hook';
import { InputProductType } from '../store/types/product';

interface AddProductModalProps {}

const AddProductModal: React.FC<AddProductModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const disptach = useAppDispatch();

  const [imageSrc, setImageSrc] = useState('');
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
    setImageSrc('');
    toast({
      title: 'Product Added!!',
      status: 'success',
      position: 'top',
      duration: 4000,
      isClosable: true,
    });
  };

  const uploadFIle: any = useRef(null);
  const onBtnClick = () => {
    if (!uploadFIle.current) {
      return;
    }
    uploadFIle.current.click();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="whatsapp">
        New Product <AddIcon ml="10px" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Flex direction="column" rowGap="15px">
                <Input
                  required
                  placeholder="Basic usage"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />

                <Input
                  required
                  placeholder="Basic usage"
                  type="number"
                  value={product.qty}
                  onChange={(e) =>
                    setProduct({ ...product, qty: Number(e.target.value) })
                  }
                />
                <Input
                  required
                  placeholder="Basic usage"
                  type="date"
                  value={product.expiredAt}
                  onChange={(e) =>
                    setProduct({ ...product, expiredAt: e.target.value })
                  }
                />

                <Button onClick={onBtnClick}>
                  <PlusSquareIcon mr="5px" /> Upload Image
                </Button>
                {imageSrc && <Image src={imageSrc} w="50px" h="50px" />}
                <input
                  ref={uploadFIle}
                  style={{ display: 'none' }}
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
                        setImageSrc(reader.result as string);
                      };
                    }
                  }}
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
