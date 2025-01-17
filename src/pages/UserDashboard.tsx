import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getUserReservations } from '../services/api';
import { Reservation } from '../types';

export function UserDashboard() {
  const { data: reservations, isLoading } = useQuery<Reservation[]>(
    'userReservations',
    getUserReservations
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes réservations</h1>
      
      {isLoading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : reservations?.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          Vous n'avez pas encore de réservations
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations?.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Réservation #{reservation._id.slice(-6)}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(reservation.createdAt), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    reservation.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : reservation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {reservation.status === 'confirmed'
                      ? 'Confirmée'
                      : reservation.status === 'pending'
                      ? 'En attente'
                      : 'Annulée'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Période :</span>
                    <p>
                      Du {format(new Date(reservation.startDate), 'dd MMMM yyyy', { locale: fr })}
                      <br />
                      au {format(new Date(reservation.endDate), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Prix total :</span>
                    <p className="font-semibold">{reservation.totalPrice}€</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}