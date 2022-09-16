import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Image,
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
import { useRef, useState } from 'react';
import { addProductAction } from '../store/actions/productAction';
import { useAppDispatch } from '../store/hooks/hook';
import { AddInputProductType } from '../store/types/product';

interface AddProductModalProps {
  loading: boolean;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disptach = useAppDispatch();

  const [imageSrc, setImageSrc] = useState('');
  const [product, setProduct] = useState<AddInputProductType>({
    expiredAt: '',
    name: '',
    picture: '',
    qty: 0,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const test = disptach(addProductAction(product));
    console.log('test console.log', test);
    setProduct({ expiredAt: '', name: '', picture: '', qty: 0 });
    setImageSrc('');
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
              <Button
                mt={4}
                w="full"
                colorScheme="telegram"
                isLoading={loading}
                type="submit"
              >
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
