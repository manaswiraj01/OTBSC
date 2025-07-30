import React, { useState } from 'react';
import { MapPin, Clock, Star, Users, Camera, TreePine, Building2, Mountain, Coffee, Search, Filter, Grid3X3, List, Mic } from 'lucide-react';

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'All Places', icon: Mountain, count: 65 },
    { id: 'wildlife', name: 'Wildlife & Parks', icon: TreePine, count: 15 },
    { id: 'museums', name: 'Museums', icon: Building2, count: 18 },
    { id: 'monuments', name: 'Monuments', icon: Mountain, count: 25 },
    { id: 'cafeterias', name: 'Parks & Cafeterias', icon: Coffee, count: 7 }
  ];

  const cities = [
    'Jaipur', 'Udaipur', 'Jodhpur', 'Bikaner', 'Kota', 'Ajmer', 'Mount Abu', 
    'Alwar', 'Bharatpur', 'Bundi', 'Chittorgarh', 'Jaisalmer', 'Sawai Madhopur',
    'Pali', 'Jhunjhunu', 'Jhalawar', 'Dungarpur', 'Baran', 'Bhilwara', 'Barmer',
    'Rajsamand', 'Churu'
  ];

  const attractions = [
    {
      id: 1,
      category: 'wildlife',
      name: 'Abheda Biological Park',
      location: 'Kota',
      price: '₹50',
      rating: 4.2,
      visitors: '1.2k',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=250&fit=crop',
      description: 'Beautiful biological park with diverse flora and fauna',
      timings: '9:00 AM - 5:00 PM',
      features: ['Nature Walks', 'Bird Watching', 'Photography']
    },
    {
      id: 2,
      category: 'monuments',
      name: 'Amber Fort',
      location: 'Jaipur',
      price: '₹500',
      rating: 4.9,
      visitors: '8.5k',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      description: 'Magnificent fort palace showcasing Rajput architecture',
      timings: '8:00 AM - 5:30 PM',
      features: ['Architecture Tour', 'Light & Sound Show', 'Elephant Ride']
    },
    {
      id: 3,
      category: 'museums',
      name: 'Bangad Government Museum',
      location: 'Pali',
      price: '₹30',
      rating: 4.1,
      visitors: '450',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop',
      description: 'Historical artifacts and local cultural exhibits',
      timings: '10:00 AM - 5:00 PM',
      features: ['Historical Artifacts', 'Guided Tours', 'Cultural Exhibits']
    },
    {
      id: 4,
      category: 'wildlife',
      name: 'Bansiyal Khetri Conservation Reserve',
      location: 'Jhunjhunu',
      price: '₹100',
      rating: 4.3,
      visitors: '680',
      image: 'https://images.unsplash.com/photo-1574263867128-e4d5c6f4a099?w=400&h=250&fit=crop',
      description: 'Conservation area with native wildlife species',
      timings: '6:00 AM - 6:00 PM',
      features: ['Wildlife Safari', 'Conservation Tours', 'Nature Photography']
    },
    {
      id: 5,
      category: 'wildlife',
      name: 'Beed Conservation Reserve',
      location: 'Jhunjhunu',
      price: '₹80',
      rating: 4.0,
      visitors: '520',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop',
      description: 'Protected area for wildlife conservation',
      timings: '6:00 AM - 6:00 PM',
      features: ['Wildlife Viewing', 'Nature Trails', 'Educational Tours']
    },
    {
      id: 6,
      category: 'wildlife',
      name: 'Bird Park',
      location: 'Jaipur',
      price: '₹40',
      rating: 4.4,
      visitors: '2.1k',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=250&fit=crop',
      description: 'Dedicated park for various bird species',
      timings: '6:00 AM - 6:00 PM',
      features: ['Bird Watching', 'Photography', 'Nature Education']
    },
    {
      id: 7,
      category: 'wildlife',
      name: 'Bird Park Gulab Bagh',
      location: 'Udaipur',
      price: '₹50',
      rating: 4.5,
      visitors: '1.8k',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
      description: 'Beautiful bird park within Gulab Bagh gardens',
      timings: '7:00 AM - 7:00 PM',
      features: ['Bird Species', 'Garden Views', 'Family Friendly']
    },
    {
      id: 8,
      category: 'monuments',
      name: 'Cenotaph Of 84 Pillars',
      location: 'Bundi',
      price: '₹25',
      rating: 4.6,
      visitors: '890',
      image: 'https://images.unsplash.com/photo-1599661046827-dacde6013634?w=400&h=250&fit=crop',
      description: 'Historic cenotaph with intricate architecture',
      timings: '9:00 AM - 5:00 PM',
      features: ['Historical Architecture', 'Photography', 'Cultural Heritage']
    },
    {
      id: 9,
      category: 'monuments',
      name: 'Chittorgarh Fort Light And Sound Show',
      location: 'Chittorgarh',
      price: '₹200',
      rating: 4.8,
      visitors: '3.2k',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=250&fit=crop',
      description: 'Spectacular light and sound show at historic fort',
      timings: '7:00 PM - 8:30 PM',
      features: ['Light Show', 'Historical Narration', 'Evening Entertainment']
    },
    {
      id: 10,
      category: 'wildlife',
      name: 'Elephant Village (Hathi Gaon)',
      location: 'Jaipur',
      price: '₹300',
      rating: 4.7,
      visitors: '2.5k',
      image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&h=250&fit=crop',
      description: 'Traditional elephant village experience',
      timings: '8:00 AM - 6:00 PM',
      features: ['Elephant Interaction', 'Village Experience', 'Cultural Learning']
    },
    {
      id: 11,
      category: 'monuments',
      name: 'Gagron Fort',
      location: 'Jhalawar',
      price: '₹40',
      rating: 4.5,
      visitors: '1.1k',
      image: 'https://images.unsplash.com/photo-1597410044024-9d4b1addeaa6?w=400&h=250&fit=crop',
      description: 'UNESCO World Heritage hill fort',
      timings: '9:00 AM - 5:00 PM',
      features: ['UNESCO Heritage', 'Hill Fort', 'Historical Significance']
    },
    {
      id: 12,
      category: 'museums',
      name: 'Gandhi Vatika Museum',
      location: 'Jaipur',
      price: '₹20',
      rating: 4.3,
      visitors: '780',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop',
      description: 'Museum dedicated to Mahatma Gandhi',
      timings: '10:00 AM - 5:00 PM',
      features: ['Gandhi Exhibits', 'Historical Documents', 'Educational Tours']
    },
    {
      id: 13,
      category: 'museums',
      name: 'Government Central Museum Albert Hall',
      location: 'Jaipur',
      price: '₹150',
      rating: 4.8,
      visitors: '5.2k',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=250&fit=crop',
      description: 'Premier museum with diverse collections',
      timings: '9:00 AM - 5:00 PM',
      features: ['Art Collections', 'Artifacts', 'Architecture']
    },
    {
      id: 14,
      category: 'monuments',
      name: 'Hawa Mahal',
      location: 'Jaipur',
      price: '₹200',
      rating: 4.9,
      visitors: '7.8k',
      image: 'https://images.unsplash.com/photo-1599661046827-dacde6013634?w=400&h=250&fit=crop',
      description: 'Iconic palace with unique honeycomb architecture',
      timings: '9:00 AM - 4:30 PM',
      features: ['Architecture', 'Photography', 'City Views']
    },
    {
      id: 15,
      category: 'wildlife',
      name: 'Keoladeo Ghana National Park',
      location: 'Bharatpur',
      price: '₹200',
      rating: 4.8,
      visitors: '4.5k',
      image: 'https://images.unsplash.com/photo-1574263867128-e4d5c6f4a099?w=400&h=250&fit=crop',
      description: 'UNESCO World Heritage bird sanctuary',
      timings: '6:00 AM - 6:00 PM',
      features: ['Bird Watching', 'Cycling', 'Nature Walks']
    },
    {
      id: 16,
      category: 'wildlife',
      name: 'Sariska Tiger Reserve',
      location: 'Alwar',
      price: '₹300',
      rating: 4.7,
      visitors: '3.8k',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=250&fit=crop',
      description: 'Famous tiger reserve with diverse wildlife',
      timings: '6:00 AM - 6:00 PM',
      features: ['Tiger Safari', 'Wildlife Photography', 'Nature Trails']
    },
    {
      id: 17,
      category: 'cafeterias',
      name: 'RTDC Durg Cafeteria Padao Nahargarh',
      location: 'Jaipur',
      price: '₹150',
      rating: 4.4,
      visitors: '1.2k',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
      description: 'Scenic hilltop cafeteria with city views',
      timings: '10:00 AM - 10:00 PM',
      features: ['City Views', 'Local Cuisine', 'Sunset Views']
    },
    {
      id: 18,
      category: 'cafeterias',
      name: 'Masala Chowk (JDA)',
      location: 'Jaipur',
      price: '₹100',
      rating: 4.5,
      visitors: '2.1k',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop',
      description: 'Popular food court with diverse cuisines',
      timings: '5:00 PM - 11:00 PM',
      features: ['Street Food', 'Multiple Cuisines', 'Evening Dining']
    }

  ];

  const filteredAttractions = attractions.filter(attraction => {
    const matchesCategory = activeCategory === 'all' || attraction.category === activeCategory;
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         attraction.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || attraction.location === selectedCity;
    return matchesCategory && matchesSearch && matchesCity;
  });

  const sortedAttractions = [...filteredAttractions].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
      case 'visitors':
        return parseInt(b.visitors.replace('k', '000').replace('.', '')) - parseInt(a.visitors.replace('k', '000').replace('.', ''));
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const AttractionCard = ({ attraction }) => (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <figure className="relative">
        <img 
          src={attraction.image} 
          alt={attraction.name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="badge badge-primary badge-lg font-semibold">
            {attraction.price}
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1 bg-black bg-opacity-50 rounded-lg px-2 py-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">{attraction.rating}</span>
          </div>
        </div>
      </figure>
      
      <div className="card-body p-4">
        <h3 className="card-title text-lg font-bold">{attraction.name}</h3>
        
        <div className="flex items-center gap-1 text-base-content/70 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{attraction.location}</span>
        </div>
        
        <p className="text-sm text-base-content/80 mb-3">{attraction.description}</p>
        
        <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{attraction.timings}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{attraction.visitors} visitors</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {attraction.features.map((feature, index) => (
            <span key={index} className="badge badge-outline badge-sm">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">
            Book Now
          </button>
          <button className="btn btn-ghost btn-sm">
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const AttractionListItem = ({ attraction }) => (
    <div className="card card-side bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <figure className="w-48 h-32">
        <img 
          src={attraction.image} 
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body flex-1 p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="card-title text-lg">{attraction.name}</h3>
            <div className="flex items-center gap-1 text-base-content/70 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{attraction.location}</span>
            </div>
            <p className="text-sm text-base-content/80 mb-2">{attraction.description}</p>
            <div className="flex flex-wrap gap-1">
              {attraction.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="badge badge-outline badge-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="badge badge-primary badge-lg font-semibold">
              {attraction.price}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{attraction.rating}</span>
            </div>
            <button className="btn btn-primary btn-sm">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section with Overlapping Images */}
      <div className="relative bg-base-100 overflow-hidden min-h-[70vh]">
        <div className="container mx-auto px-4 py-16  mt-13">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold text-base-content">
                  Welcome to <br />
                  Rajasthan's
                </h1>
                <h2 className="text-6xl lg:text-7xl font-bold text-pink-500">
                  Untouched
                </h2>
                <h3 className="text-6xl lg:text-7xl font-bold text-base-content">
                  Diversity
                </h3>
              </div>
              
              <div className="mt-12">
                <h4 className="text-2xl lg:text-3xl font-semibold text-base-content mb-8">
                  Tourist Places to Visit in Rajasthan
                </h4>
                
                {/* Search Bar */}
                <div className="form-control w-full max-w-lg">
                  <div className="input-group">
                    <input 
                      type="text" 
                      placeholder="Search your desired Destination...." 
                      className="input input-bordered w-full text-base-content bg-base-100"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-square">
                      <Mic className="h-5 w-5" />
                    </button>
                    <button className="btn btn-primary">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Overlapping Images */}
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Desert Image - Top Right */}
              <div className="absolute top-0 right-0 w-80 h-48 rounded-2xl overflow-hidden shadow-2xl z-30">
                <img 
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop" 
                  alt="Desert Landscape"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Tiger Image - Center Left */}
              <div className="absolute top-20 left-0 w-72 h-56 rounded-2xl overflow-hidden shadow-2xl z-20">
                <img 
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=350&fit=crop" 
                  alt="Bengal Tiger"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Palace Image - Bottom Center */}
              <div className="absolute bottom-20 right-12 w-64 h-44 rounded-2xl overflow-hidden shadow-2xl z-10">
                <img 
                  src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQszm6UwAmz7sSaNTvJ7WNceMEXogGDZMUqT93gWPUc-vtea5Q6bEAi8FSYfwoM7-T-a1rAG3Lpx2FKgBxGR_t8pJFOezPUikw_p9nz2A" 
                  alt="Rajasthani Palace"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-40 right-20 w-4 h-4 bg-pink-500 rounded-full z-40"></div>
              <div className="absolute bottom-40 left-20 w-6 h-6 bg-primary rounded-full z-40"></div>
              <div className="absolute top-60 left-40 w-3 h-3 bg-secondary rounded-full z-40"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">All Places</div>
              <div className="stat-value text-primary">{sortedAttractions.length}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Category Filter */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline gap-2">
                <Filter className="w-4 h-4" />
                All
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button onClick={() => setActiveCategory(category.id)}>
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* City Filter */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline gap-2">
                <MapPin className="w-4 h-4" />
                Cities
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-60 overflow-y-auto">
                <li><button onClick={() => setSelectedCity('all')}>All Cities</button></li>
                {cities.map((city) => (
                  <li key={city}>
                    <button onClick={() => setSelectedCity(city)}>
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Filter */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline gap-2">
                Sort
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button onClick={() => setSortBy('name')}>Name</button></li>
                <li><button onClick={() => setSortBy('rating')}>Rating</button></li>
                <li><button onClick={() => setSortBy('price')}>Price</button></li>
                <li><button onClick={() => setSortBy('visitors')}>Popularity</button></li>
              </ul>
            </div>

            {/* View Toggle */}
            <div className="join">
              <input 
                className="join-item btn" 
                type="radio" 
                name="view-options" 
                aria-label="Grid"
                checked={viewMode === 'grid'}
                onChange={() => setViewMode('grid')}
              />
              <input 
                className="join-item btn" 
                type="radio" 
                name="view-options" 
                aria-label="List"
                checked={viewMode === 'list'}
                onChange={() => setViewMode('list')}
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="tabs tabs-boxed justify-center mb-8 bg-base-100 p-1">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                className={`tab tab-lg gap-2 ${activeCategory === category.id ? 'tab-active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                <div className="badge badge-sm">{activeCategory === category.id ? sortedAttractions.length : category.count}</div>
              </button>
            );
          })}
        </div>

        {/* Attractions Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAttractions.map((attraction) => (
              <AttractionListItem key={attraction.id} attraction={attraction} />
            ))}
          </div>
        )}

        {/* No Results */}
        {sortedAttractions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-semibold mb-2">No attractions found</h3>
            <p className="text-base-content/70 mb-4">Try adjusting your search or filters</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
                setSelectedCity('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {sortedAttractions.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn btn-outline btn-primary btn-wide">
              Load More Attractions
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-base-300 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Rajasthan?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your tickets online and skip the queues. Experience the best of Rajasthan's cultural heritage and natural beauty.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn btn-primary btn-lg">Download Mobile App</button>
            <button className="btn btn-outline btn-lg">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;