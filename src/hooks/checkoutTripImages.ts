import { useEffect, useState } from 'react';
import { useLazyCheckoutTripImageQuery } from '../redux/api/camping';

import type { ILocationImage } from '../models/Locations.model';

export const useCheckoutTripImages = ({ images }: { images: ILocationImage[] }) => {
  const [checkoutImageURL] = useLazyCheckoutTripImageQuery();

  const [tripImagesURL, setTripImagesURL] = useState<ILocationImage[]>([]);

  useEffect(() => {
    const tripImages: ILocationImage[] = [];

    const checkoutImage = async (image: ILocationImage) => {
      try {
        await checkoutImageURL({ imageURL: image.url }).unwrap();
      } catch (imageError: any) {
        // imageError.data return html 404 page when image is not loaded
        // or "undefined" status otherwise

        if (!imageError.data) {
          tripImages.push(image);
        }
      }
    };

    images.forEach((image: ILocationImage) => {
      checkoutImage(image);
    });

    setTripImagesURL(tripImages);
  }, []);

  return tripImagesURL;
};
