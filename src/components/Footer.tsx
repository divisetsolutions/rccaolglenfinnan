import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Mass Times</h3>
            <p>For the most up-to-date Mass and service times, including special events, funerals, and any temporary changes, please view our full parish calendar.</p>
            <Link href="/calendar">
              <p className="text-blue-400 hover:underline mt-4">View Full Calendar</p>
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">The Churches</h3>
            <h4 className="font-semibold">St. John the Evangelist RC Church</h4>
            <p>St Johns Road, Caol, Fort William PH33 7PR</p>
            <p>Phone: 01397 719281</p>
            <p>Email: caol@rcdai.org.uk</p>
            <h4 className="font-semibold mt-4">St. Mary & St. Finnan Church</h4>
            <p>Glenfinnan PH37 4LT</p>
            <p>Email: glenfinnan@rcdai.org.uk</p>
            <p>Clergy based at Caol</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li><Link href="/safeguarding"><p className="hover:underline">Safeguarding</p></Link></li>
              <li><a href="https://www.rcdai.org.uk/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a></li>
              <li><a href="https://www.rcdai.org.uk" target="_blank" rel="noopener noreferrer" className="hover:underline">Diocese of Argyll and the Isles</a></li>
              <li><Link href="/donations"><p className="hover:underline">Donate</p></Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>Copyright © 2025 Parishes of Caol and Glenfinnan  | Web Design by Diviset Solutions  | Scottish Charity Registration Number: SC002876</p>
        </div>
      </div>
    </footer>
  );
}
