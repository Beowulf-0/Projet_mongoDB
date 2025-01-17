import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Offer } from '../../types';

interface OfferFormProps {
  offer?: Offer;
  onSubmit: (data: Partial<Offer>) => Promise<void>;
}

export function OfferForm({ offer, onSubmit }: OfferFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Offer>>({
    defaultValues: offer
  });

  const handleFormSubmit = async (data: Partial<Offer>) => {
    try {
      await onSubmit(data);
      toast.success(offer ? 'Offre mise à jour' : 'Offre créée');
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          {...register('type', { required: 'Le type est requis' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Sélectionner un type</option>
          <option value="accommodation">Hébergement</option>
          <option value="activity">Activité</option>
          <option value="transport">Transport</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          {...register('title', { required: 'Le titre est requis' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'La description est requise' })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prix</label>
        <input
          type="number"
          {...register('price', {
            required: 'Le prix est requis',
            min: { value: 0, message: 'Le prix doit être positif' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Localisation</label>
        <input
          type="text"
          {...register('location', { required: 'La localisation est requise' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images (URLs)</label>
        <input
          type="text"
          {...register('images.0', { required: 'Au moins une image est requise' })}
          placeholder="URL de l'image principale"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de début</label>
          <input
            type="date"
            {...register('availability.startDate', { required: 'La date de début est requise' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de fin</label>
          <input
            type="date"
            {...register('availability.endDate', { required: 'La date de fin est requise' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {offer ? 'Mettre à jour' : 'Créer l\'offre'}
        </button>
      </div>
    </form>
  );
}