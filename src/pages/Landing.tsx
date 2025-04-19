
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, PieChart, BarChart, TrendingUp, Landmark } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center space-x-2">
          <Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold">ExpenseTrack</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-10 lg:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Take Control of Your <span className="text-blue-600 dark:text-blue-400">Financial Life</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Track expenses, create budgets, and gain insights into your spending habits with our simple yet powerful expense tracker.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/login">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Monthly Overview</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">April 2023</span>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="font-medium">Total Expenses</span>
                    </div>
                    <span className="font-bold">₹1,248.33</span>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <span className="font-medium">Budget Status</span>
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400">On Track</span>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="font-medium">Savings</span>
                    </div>
                    <span className="font-bold">₹328.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-white dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily log and categorize your expenses to understand where your money goes.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Insightful Reports</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Visualize your spending patterns with interactive charts and detailed reports.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set and manage budgets to help achieve your financial goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Landmark className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">ExpenseTrack</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">
                © {new Date().getFullYear()} ExpenseTrack. University Project.
              </p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h4 className="font-semibold mb-3">About</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Team</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
