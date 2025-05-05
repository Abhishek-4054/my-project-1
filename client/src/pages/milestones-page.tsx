import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PatientPage() {
  const reports = [
    { title: "Blood Test Report", description: "Detailed blood test results including CBC, lipid profile, etc." },
    { title: "Ultrasound Report", description: "Ultrasound images and findings" },
  ];

  const scans = [
    { title: "MRI Scan", description: "MRI scan images and analysis" },
    { title: "CT Scan", description: "CT scan images and findings" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        <main className="flex-1 md:pl-64 pt-6 pb-20">
          <div className="px-6 lg:px-12">
            <section>
              <h2 className="text-4xl font-semibold text-gray-800 mb-8">Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report, index) => (
                  <Card
                    key={index}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{report.description}</p>
                      <div className="mt-5 flex gap-3">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition">
                          View
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 transition">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-4xl font-semibold text-gray-800 mb-8">Scans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scans.map((scan, index) => (
                  <Card
                    key={index}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">{scan.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{scan.description}</p>
                      <div className="mt-5 flex gap-3">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition">
                          View
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 transition">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
