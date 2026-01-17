'use client';

import { useState } from 'react';
import { Search, Loader2, AlertCircle, FileText } from 'lucide-react';
import {searchDoc} from "../../src/actions/actions";

export default function SearchComponent() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSearch = async () => {
        if (!searchText.trim()) {
            setError('Please enter a search term');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        const formData = new FormData();
        formData.append('search', searchText);

        try {
            // Call your server action here
            // const result = await searchDoc(null, formData);

            const result = await searchDoc(null, formData);
            setResults(result);

        } catch (err) {
            setError('An error occurred while searching. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Search Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Documents</h1>

                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter search term..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-4 h-4" />
                                    Search
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-red-900">Error</h3>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                {results && (
                    <div className="bg-white rounded-lg shadow-sm">
                        {/* Results Header */}
                        <div className="border-b border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Search Results
                                </h2>
                                <span className="text-sm text-gray-600">
                  {results.totalElements} {results.totalElements === 1 ? 'result' : 'results'} found
                </span>
                            </div>
                        </div>

                        {/* Results List */}
                        <div className="divide-y divide-gray-200">
                            {results.content && results.content.length > 0 ? (
                                results.content.map((item) => (
                                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 mt-1">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-3">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span>ID: {item.id}</span>
                                                    {item.createdAt && (
                                                        <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">No results found</p>
                                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search terms</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Info */}
                        {results.totalPages > 1 && (
                            <div className="border-t border-gray-200 px-6 py-4">
                                <p className="text-sm text-gray-600 text-center">
                                    Page {results.number + 1} of {results.totalPages}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !results && !error && (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Start Searching
                        </h3>
                        <p className="text-gray-600">
                            Enter a search term above to find documents
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}