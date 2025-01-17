import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-hot-toast';
import { getOffer, createReservation } from '../services/api';
import { Offer } from '../types';
import { useState } from 'react';

export function OfferDetails() {
  const { id } = useParams<{ id: string }>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const { data: offer, isLoading } = useQuery<Offer>(
    ['offer', id],
    () => getOffer(id!)
  );

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      toast.error('Veuillez sélectionner les dates');
      return;
    }

    try {
      setIsBooking(true);
      await createReservation({
        offerId: id!,
        startDate,
        endDate
      });
      toast.success('Réservation effectuée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la réservation');
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading || !offer) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{offer.title}</h1>
            <p className="text-gray-600 mb-4">{offer.description}</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Localisation</h3>
                <p>{offer.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Type</h3>
                <p className="capitalize">{offer.type}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Prix</h3>
                <p className="text-2xl font-bold text-blue-600">{offer.price}€</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Disponibilité</h3>
                <p>
                  Du {format(new Date(offer.availability.startDate), 'dd MMMM yyyy', { locale: fr })} au{' '}
                  {format(new Date(offer.availability.endDate), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6">Réserver</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de début</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={offer.availability.startDate}
                  max={offer.availability.endDate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de fin</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || offer.availability.startDate}
                  max={offer.availability.endDate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleBooking}
                disabled={isBooking || !startDate || !endDate}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isBooking ? 'Réservation en cours...' : 'Réserver maintenant'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}