import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Offer } from '../../types';

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={offer.images[0]}
        alt={offer.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{offer.location}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{offer.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">{offer.price}€</span>
          <Link
            to={`/offers/${offer._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
}