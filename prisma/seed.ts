import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create permissions with upsert to handle existing data
  const permissionNames = [
    'user.create',
    'user.read',
    'user.update',
    'user.delete',
    'article.create',
    'article.read',
    'article.update',
    'article.delete',
    'article.manage',
    'service.create',
    'service.read',
    'service.update',
    'service.delete',
  ]

  const permissions = await Promise.all(
    permissionNames.map(name =>
      prisma.permission.upsert({
        where: { name },
        update: {},
        create: { name }
      })
    )
  )

  console.log('✅ Permissions created/updated')

  // Create groups with upsert
  const adminGroup = await prisma.group.upsert({
    where: { name: 'admin' },
    update: {
      permissions: {
        set: permissions.map(p => ({ id: p.id }))
      }
    },
    create: {
      name: 'admin',
      permissions: {
        connect: permissions.map(p => ({ id: p.id }))
      }
    }
  })

  const editorGroup = await prisma.group.upsert({
    where: { name: 'editor' },
    update: {
      permissions: {
        set: permissions
          .filter(p => p.name.includes('article') || p.name.includes('read'))
          .map(p => ({ id: p.id }))
      }
    },
    create: {
      name: 'editor',
      permissions: {
        connect: permissions
          .filter(p => p.name.includes('article') || p.name.includes('read'))
          .map(p => ({ id: p.id }))
      }
    }
  })

  const userGroup = await prisma.group.upsert({
    where: { name: 'user' },
    update: {
      permissions: {
        set: permissions
          .filter(p => p.name.includes('read'))
          .map(p => ({ id: p.id }))
      }
    },
    create: {
      name: 'user',
      permissions: {
        connect: permissions
          .filter(p => p.name.includes('read'))
          .map(p => ({ id: p.id }))
      }
    }
  })

  console.log('✅ Groups created/updated')

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 12)
  const editorPassword = await bcrypt.hash('editor123', 12)
  const userPassword = await bcrypt.hash('user123', 12)

  // Create users with upsert
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: adminPassword,
      role: 'admin',
      groups: {
        set: [{ id: adminGroup.id }]
      }
    },
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      profile: 'https://example.com/admin.jpg',
      bio: 'System Administrator',
      groups: {
        connect: [{ id: adminGroup.id }]
      }
    }
  })

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@example.com' },
    update: {
      password: editorPassword,
      role: 'editor',
      groups: {
        set: [{ id: editorGroup.id }]
      }
    },
    create: {
      name: 'Editor User',
      email: 'editor@example.com',
      password: editorPassword,
      role: 'editor',
      profile: 'https://example.com/editor.jpg',
      bio: 'Content Editor',
      groups: {
        connect: [{ id: editorGroup.id }]
      }
    }
  })

  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {
      password: userPassword,
      role: 'user',
      groups: {
        set: [{ id: userGroup.id }]
      }
    },
    create: {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
      profile: 'https://example.com/user.jpg',
      bio: 'Regular User',
      groups: {
        connect: [{ id: userGroup.id }]
      }
    }
  })

  console.log('✅ Users created/updated')

  console.log(`
🎉 Seeding completed!

Test accounts:
- Admin: admin@example.com / admin123
- Editor: editor@example.com / editor123  
- User: user@example.com / user123

Groups and permissions:
- Admin: All permissions
- Editor: Article and read permissions
- User: Read permissions only
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
