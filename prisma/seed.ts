import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.statistics.deleteMany()
  await prisma.systemStatus.deleteMany()
  await prisma.operationsQueue.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Cleared existing data')

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        userCode: 'U00128',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0101',
        role: 'Seller',
        status: 'Active',
        lastLogin: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      },
      {
        userCode: 'U00055',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0102',
        role: 'Buyer',
        status: 'Active',
        lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userCode: 'U00340',
        name: 'Tech Tester',
        email: 'tech.tester@example.com',
        phone: '+1-555-0103',
        role: 'QC_Agent',
        status: 'Locked',
        lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        userCode: 'U00401',
        name: 'New User',
        email: 'new.user@example.com',
        phone: '+1-555-0104',
        role: 'Buyer',
        status: 'Pending',
        lastLogin: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
    ],
  })

  console.log('✅ Created users')

  // Seed Operations Queue
  await prisma.operationsQueue.createMany({
    data: [
      {
        orderCode: 'ORD-9012',
        title: 'Cashew Lot 42',
        description: 'QC Report Approval',
        actionType: 'QC Report Approval',
        relatedEntity: 'Seller: East Africa Traders',
        status: 'Pending_QC',
        priority: 2,
      },
      {
        orderCode: 'TXN-1002',
        title: '$15,000 Payment',
        description: 'High Value Transaction Approval',
        actionType: 'High Value Transaction Approval',
        relatedEntity: 'Buyer: Global Nuts Inc.',
        status: 'Hold',
        priority: 1,
      },
    ],
  })

  console.log('✅ Created operations queue')

  // Seed System Status
  await prisma.systemStatus.createMany({
    data: [
      {
        serviceName: 'API Gateway',
        status: 'Operational',
        details: 'Latency: 50ms',
        latencyMs: 50,
      },
      {
        serviceName: 'Database Server',
        status: 'Warning',
        details: 'High Load. CPU: 85%',
        cpuUsage: 85,
      },
      {
        serviceName: 'Logistics Partner Sync',
        status: 'Down',
        details: 'Connection failed 3 hours ago.',
      },
    ],
  })

  console.log('✅ Created system status')

  // Seed Statistics
  await prisma.statistics.createMany({
    data: [
      {
        statType: 'Pending Orders',
        currentValue: '147',
        trendDirection: 'down',
        trendValue: '5%',
        period: 'vs last week',
      },
      {
        statType: 'System Uptime',
        currentValue: '99.9%',
        trendDirection: 'up',
        trendValue: '0.05%',
        period: 'vs last month',
      },
      {
        statType: 'New Registrations',
        currentValue: '25',
        trendDirection: 'up',
        trendValue: '12%',
        period: 'vs last week',
      },
      {
        statType: 'Open Support Tickets',
        currentValue: '7',
        trendDirection: 'up',
        trendValue: '2 High',
        period: 'Priority',
      },
    ],
  })

  console.log('✅ Created statistics')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })