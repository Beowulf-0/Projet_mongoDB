import { useState } from 'react';
import { useQuery } from 'react-query';
import { getOffers } from '../services/api';
import { Offer } from '../types';
import { Search, MapPin, Calendar } from 'lucide-react';

export function Home() {
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const { data: offers, isLoading } = useQuery<Offer[]>(
    ['offers', filters],
    () => getOffers(filters)
  );

  return (
    <div className="space-y-8">
      <section className="bg-blue-600 text-white py-16 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Trouvez votre prochaine destination</h1>
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-md text-gray-700"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">Type</option>
                  <option value="accommodation">Hébergement</option>
                  <option value="activity">Activité</option>
                  <option value="transport">Transport</option>
                </select>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers?.map((offer) => (
              <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={offer.images[0]}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">{offer.price}€</span>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={() => window.location.href = `/offers/${offer._id}`}
                    >
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}